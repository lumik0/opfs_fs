export default class FS {
    public static root: FileSystemDirectoryHandle;
    public static logDebug = true;
    
    private static log(...args: any[]) {
        if(this.logDebug){
            console.log(...args);
        }
    }
    private static async getPathParts(path: string): Promise<string[]> {
        return path.replace(/^\/+/, "").split("/").filter(Boolean)
    }
    private static async getParentDirHandle(path: string, create = false): Promise<FileSystemDirectoryHandle> {
        const parts = await this.getPathParts(path)
        parts.pop()
        let dir = FS.root
        for(const part of parts) {
            dir = await dir.getDirectoryHandle(part, {create})
        }
        return dir
    }
    private static async getFileHandle(path: string, create = false): Promise<FileSystemFileHandle> {
        const parts = await this.getPathParts(path)
        const name = parts.pop()!
        const parent = await this.getParentDirHandle(path, create)
        return parent.getFileHandle(name, {create})
    }
    private static async getDirectoryHandle(path: string, create = false): Promise<FileSystemDirectoryHandle> {
        const parts = await this.getPathParts(path)
        let dir = FS.root
        for(const part of parts) {
            dir = await dir.getDirectoryHandle(part, {create})
        }
        return dir
    }

    public static async createFile(path: string): Promise<void> {
        await this.getFileHandle(path, true);
        this.log(`Created file [${path}]`);
    }
    public static async writeFile(path: string, data: string | Blob | Uint8Array): Promise<void> {
        const fileHandle = await this.getFileHandle(path, true)
        const writable = await fileHandle.createWritable()
        if(data instanceof Uint8Array) await writable.write(new Blob([data]))
        else await writable.write(data)
        await writable.close()
        this.log(`Writed file [${path}] = ${data instanceof Uint8Array ? `${data.length} length of uint8array` : data instanceof Blob ? "" : `${data.length} length of string`}`);
    }
    public static async readFile(path: string): Promise<string> {
        const fileHandle = await this.getFileHandle(path)
        const file = await fileHandle.getFile()
        return await file.text()
    }
    public static async readFileBytes(path: string): Promise<Uint8Array> {
        const fileHandle = await this.getFileHandle(path)
        const file = await fileHandle.getFile()
        const buffer = await file.arrayBuffer()
        return new Uint8Array(buffer)
    }
    public static async createDir(path: string): Promise<void> {
        await this.getDirectoryHandle(path, true)
        this.log(`Created directory [${path}]`);
    }
    public static async isFile(path: string): Promise<boolean> {
        try {
            await this.getFileHandle(path)
            return true
        } catch {
            return false
        }
    }
    public static async isDirectory(path: string): Promise<boolean> {
        try {
            await this.getDirectoryHandle(path)
            return true
        } catch {
            return false
        }
    }
    public static async deleteFile(path: string): Promise<boolean> {
        try {
            const parts = await this.getPathParts(path)
            const name = parts.pop()!
            const parent = await this.getParentDirHandle(path)
            await parent.removeEntry(name)
            this.log(`Deleted file [${path}]`);
            return true
        } catch(e) {
            this.log(`Can't delete file [${path}] - ${e}`);
            return false
        }
    }
    public static async deleteDirectory(path: string, recursive = false): Promise<boolean> {
        try {
            const parts = await this.getPathParts(path)
            const name = parts.pop()!
            const parent = await this.getParentDirHandle(path)
            await parent.removeEntry(name, {recursive})
            this.log(`Deleted directory [${path}]`);
            return true
        } catch(e) {
            this.log(`Can't delete directory [${path}] - ${e}`);
            return false
        }
    }
    public static async listDir(path: string): Promise<string[]> {
        try {
            const dir = await this.getDirectoryHandle(path)
            const result: string[] = []
            for await(const [name] of dir.entries()) result.push(name)
            return result
        } catch {
            return []
        }
    }
    public static async rename(oldPath: string, newPath: string): Promise<boolean> {
        try {
            const file = await this.readFileBytes(oldPath)
            await this.writeFile(newPath, file)
            return await this.deleteFile(oldPath)
            this.log(`Renamed file ${oldPath} - ${newPath}`);
        } catch {
            this.log(`Can't rename file ${oldPath} - ${newPath}`);
            return false
        }
    }
    public static async copy(fromPath: string, toPath: string): Promise<boolean> {
        try {
            const data = await this.readFileBytes(fromPath)
            await this.writeFile(toPath, data)
            this.log(`Copy ${fromPath} - ${toPath}`);
            return true
        } catch {
            this.log(`Can't copy ${fromPath} - ${toPath}`);
            return false
        }
    }
    public static async move(fromPath: string, toPath: string): Promise<boolean> {
        if(await FS.copy(fromPath, toPath)) {
            this.log(`Move ${fromPath} - ${toPath}`);
            return await FS.deleteFile(fromPath);
        }
        this.log(`Can't move ${fromPath} - ${toPath}`);
        return false
    }
}
