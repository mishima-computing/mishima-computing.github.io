# Incident Report: PowerShell Default Encoding Mojibake (2026-06-04)

## 概要 (Summary)
アクセシビリティ（A11y）改善を目的とした全HTMLファイルの一括置換作業中、AIエージェント（Antigravity）が実行したPowerShellスクリプトのエンコーディング指定漏れにより、全ページの日本語（マルチバイト文字）が破壊される「文字化け（Mojibake）」インシデントが発生した。

- **発生日時**: 2026年6月4日 14:13頃 (JST)
- **影響範囲**: リポジトリ内の全HTMLファイル（7ファイル）
- **検知**: デプロイ直後、ユーザーによる目視確認で発覚

## 根本原因 (Root Cause)
Windows環境におけるPowerShellの `[IO.File]::ReadAllText` および `[IO.File]::WriteAllText` は、エンコーディングを明示しない場合、システムのデフォルトエンコーディング（Shift-JISやWindows-1252など）でファイルを読み書きする。

AIエージェントが、フッター見出し階層（`<h4>` → `<h2>`）や `lang="en"` 属性の一括付与を自動化するために生成した以下のPowerShellスクリプトにおいて、意図的なエンコーディング指定が欠落していた。

```powershell
# 【失敗したスクリプト（抜粋）】
$content = Get-Content $_.FullName -Raw
$newContent = $content -replace ...
[IO.File]::WriteAllText($_.FullName, $newContent) # ここでUTF-8が破壊された
```

このスクリプトが元のUTF-8ファイルを別のエンコーディングで上書き保存した結果、`会社情報` が `Ã¤Â¼Å¡Ã§Â¤Â¾Ã¦Æ’â€¦Ã¥Â Â±` のように不可逆な文字化けを起こした。

## 解決策・復旧手順 (Resolution)
インシデント発覚後、ただちに以下の手順で復旧と修正の再適用を行った。

1. **ロールバックの実行**
   影響を受けたコミットを `git reset --hard HEAD~1` でローカルから破棄し、`git push -f origin main` によりリモートリポジトリ（GitHub）の破損状態を正常な状態に強制復旧した。

2. **安全なスクリプトによる再実行**
   PowerShell 5.1 の `Set-Content -Encoding UTF8` はファイル先頭に不要なBOM（Byte Order Mark）を付与してしまうため、BOMなしのUTF-8を明示的に指定できる .NET クラス `[System.Text.UTF8Encoding]::new($false)` を使用してスクリプトを再構築・再実行した。

```powershell
# 【修正後の安全なスクリプト（抜粋）】
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$content = [IO.File]::ReadAllText($_.FullName, $utf8NoBom)
# ... 置換処理 ...
[IO.File]::WriteAllText($_.FullName, $newContent, $utf8NoBom)
```

## 再発防止策 (Preventive Measures)
本件は、AIエージェントが Windows 環境下でテキスト処理を行う際の特有の落とし穴である。
今後のファイル操作において、AIエージェントは以下の原則を遵守する。

1. **エンコーディングの明示**
   PowerShell、Python、Node.js等のスクリプト言語でファイル I/O を記述する際は、**必ず明示的に UTF-8（BOMなし）を指定**する。
   - PowerShell: `[System.Text.UTF8Encoding]::new($false)`
   - Python: `open(file, encoding='utf-8')`

2. **ネイティブツールの優先使用**
   可能な限り、OSのロケールやデフォルトエンコーディングに依存するシェルスクリプトを避け、文字コードを安全に処理できる専用ツール（例: `multi_replace_file_content`）を優先して使用する。

3. **コミット前の Diff 検証**
   一括置換などの破壊的操作を行った後は、直ちにコミットせず、`git diff` でマルチバイト文字の整合性を目視（エージェント視点）で確認するステップを設ける。

4. **CIによるエンコーディングの自動監査（事後検出）**
   人的・エージェント的ミスによる文字化け混入を水際で防ぐため、GitHub Actions による自動エンコーディング監査 (`.github/workflows/encoding-check.yml`) を導入した。
   対象のテキストファイル群に対し、Python標準ライブラリのみを用いた高速な検査 (`scripts/check_encoding.py`) を全PushおよびPull Request時に実行し、以下のいずれかに該当する場合は直ちにCIを失敗（赤色）させる。
   - `\xef\xbb\xbf` (UTF-8 BOM) が混入していないこと
   - `utf-8` (strict) として正しくデコードできること（不正バイトの混入がないこと）
   - 本文中に `\ufffd` (置換文字 / Replacement Character) が含まれていないこと（不可逆な文字化けの痕跡がないこと）
