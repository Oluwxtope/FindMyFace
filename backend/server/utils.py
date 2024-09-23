import os
import shutil

def create_folder(folder_path):
    if os.path.exists(folder_path):
        for filename in os.listdir(folder_path):
            file_path = os.path.join(folder_path, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)  # Remove the file
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)  # Remove the subdirectory
            except Exception as e:
                print(f'Failed to delete {file_path}. Reason: {e}')
    else:
        os.makedirs(folder_path)
        print(f'Folder {folder_path} created')

def user_folders(user_id):
    set_user_assets_folder_path = os.path.abspath(os.path.dirname(__file__)) + '/assets/' + user_id + '/'
    set_face_download_folder_path = set_user_assets_folder_path + 'downloads/face/'
    set_photos_download_folder_path = set_user_assets_folder_path + 'downloads/photos/'
    set_face_upload_folder_path = set_user_assets_folder_path + 'uploads/face/'
    set_photos_upload_folder_path = set_user_assets_folder_path + 'uploads/photos/'

    all_folder_paths = [
        set_face_download_folder_path, 
        set_photos_download_folder_path, 
        set_face_upload_folder_path, 
        set_photos_upload_folder_path
    ]

    for folder_path in all_folder_paths:
        create_folder(folder_path)
    
    return {
        "face download": set_face_download_folder_path,
        "photos download": set_photos_download_folder_path,
        "face upload": set_face_upload_folder_path,
        "photos upload": set_photos_upload_folder_path,
    }

def find_user_folder(user_id):
    return os.path.abspath(os.path.dirname(__file__)) + '/assets/' + user_id
