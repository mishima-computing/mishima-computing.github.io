import os
import glob

files = glob.glob('**/*.html', recursive=True)
files = [f for f in files if 'mishima_agent_readiness_pack' not in f]

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. footer h4 -> h2
    content = content.replace('<h4 class="footer-links-title">', '<h2 class="footer-links-title">')
    content = content.replace('</h4>\n        <ul class="footer-links">', '</h2>\n        <ul class="footer-links">')
    
    # 2. lang-en -> lang-en lang="en"
    content = content.replace('class="lang-en"', 'class="lang-en" lang="en"')
    
    # 3. contact specific headings
    if 'contact\\\\index.html' in f or 'contact/index.html' in f:
        content = content.replace('<h3 style=', '<h2 style=')
        content = content.replace('</p>\n          </div>\n        </div>\n        \n      </div>', '</p>\n          </div>\n        </div>\n        \n      </div>').replace('</h3>\n          \n          <p style=', '</h2>\n          \n          <p style=')
        content = content.replace('<h4>', '<h3>').replace('</h4>', '</h3>')
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f"Updated {f}")