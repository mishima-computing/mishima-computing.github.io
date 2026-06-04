import os
import sys

# Directories and files to exclude
EXCLUDE_DIRS = {'.git', 'node_modules', 'mishima_agent_readiness_pack'}
TARGET_EXTENSIONS = {'.md', '.html', '.css', '.js', '.json', '.txt', '.xml', '.yml', '.yaml'}

def check_files(root_dir='.'):
    violations = []
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Modify dirnames in-place to prevent os.walk from entering excluded directories
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        
        for filename in filenames:
            ext = os.path.splitext(filename)[1].lower()
            if ext not in TARGET_EXTENSIONS:
                continue
                
            filepath = os.path.join(dirpath, filename)
            
            try:
                with open(filepath, 'rb') as f:
                    raw_bytes = f.read()
            except Exception as e:
                violations.append(f"{filepath}: Failed to read file ({e})")
                continue
            
            # 1. Check for UTF-8 BOM
            if raw_bytes.startswith(b'\xef\xbb\xbf'):
                violations.append(f"{filepath}: Found UTF-8 BOM (BOM is not allowed)")
                continue
                
            # 2. Check for strict UTF-8 decoding
            try:
                decoded_text = raw_bytes.decode('utf-8', errors='strict')
            except UnicodeDecodeError:
                violations.append(f"{filepath}: Failed to decode strictly as UTF-8 (Invalid byte sequence)")
                continue
                
            # 3. Check for U+FFFD (Replacement Character)
            if '\ufffd' in decoded_text:
                violations.append(f"{filepath}: Found U+FFFD (Replacement Character), possible mojibake")
                continue

    return violations

if __name__ == '__main__':
    print("Starting encoding check...")
    violations = check_files()
    
    if violations:
        print("\n--- ENCODING VIOLATIONS FOUND ---")
        for v in violations:
            print(v)
        sys.exit(1)
    else:
        print("All files passed encoding checks.")
        sys.exit(0)
