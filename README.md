# OPFS FS

OPFS: https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system

# Example:
(JavaScript) - OLD VERSION (will be removed)
```js
await fs.createFile("file"); // create file
await fs.writeFile("file", "data"); // write file if the file does not exist, it creates it automatically
await fs.readFile("file"); // read file

await fs.createDir("folder"); // create directory in root
await (await fs.dir("folder")).createDir("subfolder"); // create directory in directory folder

await fs.isFile("file"); // true
await fs.isFile("folder"); // false
await fs.isDirectory("folder"); // true

await fs.deleteFile("file"); // delete file
await fs.deleteDirectory("folder"); // delete directory
await fs.deleteDirectory("folder", true); // delete directory with recursive
```

(TypeScript)
```ts

await fs.createFile("file"): boolean; // create file
await fs.writeFile("file", "data"): void; // write file if the file does not exist, it creates it automatically
await fs.readFile("file"): string; // read file
await fs.readFileBytes("file"): U8intArray
await fs.readFileB64("file): string // base64

await fs.createDir("folder"); // create directory in root
await fs.createDir("folder/subfolder"); // create directory in directory folder 
await fs.createDir("folder/subfolder2");
await fs.createFile("folder/file"); // create file in directory 
await fs.isFile("test"): boolean; // Error (not exists)
await fs.isFile("folder"): boolean; // false 
await fs.isFile("folder/subfolder"): boolean; // false 
await fs.isDirectory("folder"): boolean; // true
await fs.isDirectory("folder/subfolder"): boolean; // true

await fs.exists("file"): boolean; // true
await fs.exists("folder"): boolean // true
await fs.existsFile("folder"): boolean // false
await fs.existsDirectory("folder"): boolean // true
await fs.listDir("folder"): string[] // ["subfolder","subfolder2"]
await fs.renameFile("file","file2"): boolean
await fs.renameDirectory("folder","folder2"): boolean
await fs.copyFile("file2","file"): boolean
await fs.copyDirectory("folder2","folder"): boolean
await fs.move("file2","folder/"): boolean

await fs.deleteFile("file"): boolean; // delete file
await fs.deleteDirectory("folder"): boolean; // delete directory
await fs.deleteDirectory("folder/subfolder2"): boolean; // delete subfolder 
await fs.deleteDirectory("folder", true): boolean; // delete directory with recursive
await fs.open("file"): boolean
await fs.close(): boolean

await fs.loadImage("file"): Image
```

# TODO:
1. add functions:
   getFileSize, getFileSync, getFolderSize, open, close
2. update copy, move
3. chunk
4. permissions
