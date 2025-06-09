import os

# Input file list (one file path per line)
file_list_path = 'file_list.txt'
# Output master file
master_file_path = 'master_file.txt'

def create_master_file(file_list_path, master_file_path):
    if not os.path.exists(file_list_path):
        print(f"File list '{file_list_path}' not found.")
        return

    with open(file_list_path, 'r', encoding='utf-8') as list_file:
        file_paths = [line.strip() for line in list_file if line.strip()]

    with open(master_file_path, 'w', encoding='utf-8') as master_file:
        for file_path in file_paths:
            if os.path.exists(file_path):
                master_file.write(f"\n=== {os.path.basename(file_path)} ===\n")
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    master_file.write(content + "\n")
            else:
                master_file.write(f"\n=== {file_path} (NOT FOUND) ===\n")

    print(f"Master file created at '{master_file_path}'.")

# Run the function
create_master_file(file_list_path, master_file_path)
