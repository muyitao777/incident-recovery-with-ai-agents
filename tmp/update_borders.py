#!/usr/bin/env python3
import os
import re

# Define replacements
replacements = [
    ('border-slate-200', 'border-slate-100'),
    ('border-slate-300', 'border-slate-200'),
    ('shadow-sm', ''),
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = content
    for old, new in replacements:
        modified = modified.replace(old, new)
    
    # Clean up double spaces that might result from removing shadow-sm
    modified = re.sub(r' {2,}', ' ', modified)
    modified = re.sub(r' "', '"', modified)  # Fix trailing spaces before closing quote
    
    if modified != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(modified)
        return True
    return False

# Find and process all .tsx files
root_dir = '/src'
updated_files = []

for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            if process_file(filepath):
                updated_files.append(filepath)

print(f"Updated {len(updated_files)} files:")
for f in updated_files:
    print(f"  - {f}")
