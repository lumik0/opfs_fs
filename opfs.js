(async(global)=>{
    function get(handle){
        return {
            async file(path){
                return get(await handle.getFileHandle(path));
            },
            async dir(path){
                return get(await handle.getDirectoryHandle(path));
            },
            async createFile(path){
                return await handle.getFileHandle(path, {create: true});
            },
            async createDir(path){
                return await handle.getDirectoryHandle(path, {create: true});
            },
            async deleteFile(path){
                const file = await handle.getFileHandle(path);
                return await file.remove();
            },
            async deleteDir(path, recursive){
                const dir = await handle.getDirectoryHandle(path);
                return await dir.remove({recursive});
            },
            async getFile(path){
                const file = await handle.getFileHandle(path);
                return await file.getFile();
            },
            async getSyncFile(path){
                const file = await handle.getFileHandle(path);
                return await file.createSyncAccessHandle();
            },
            async getFileSize(path){
                const file = await fs.getSyncFile(path);
                return await file.getSize();
            },
            async isFile(path){
                let file;
                try{
                    file = await handle.getFileHandle(path);
                }catch{
                    return false;
                }
                return !!file;
            },
            async isDirectory(path){
                let dir;
                try{
                    dir = await handle.getDirectoryHandle(path);
                }catch{
                    return false;
                }
                return !!dir;
            },
            async writeFile(path, data){
                let file;
                try{file = await handle.getFileHandle(path);
                }catch{file = await fs.createFile(path);}
                const writable = await file.createWritable();
                await writable.write(data);
                await writable.close();
            },
            async readFile(path){
                const file = await fs.getFile(path);
                return await file.text();
            }
        }
    }

    global.fs = {
        root: await navigator.storage.getDirectory(),
        async path(path){
            let arr = path.split('/');

            let handle = fs.root;
            for(let i=0;i<arr.length;i++){
                let str = arr[i];
                // if(arr.length == i-1) {
                //     handle = await handle.getFileHandle(str);
                // } else 
                handle = await handle.getDirectoryHandle(str);
            }
            return handle;
        },
        ...get(await navigator.storage.getDirectory())
    }
})(window);
