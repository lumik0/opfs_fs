# OPFS FS

OPFS: https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system

# Example:
(JavaScript) - OLD VERSION
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

await fs.createFile("file"); // create file
await fs.writeFile("file", "data"); // write file if the file does not exist, it creates it automatically
await fs.readFile("file"); // read file

await fs.createDir("folder"); // create directory in root
await fs.createDir("folder/subfolder"); // create directory in directory folder 
await fs.createDir("folder/subfolder2");
await fs.createFile("folder/file"); // create file in directory 
await fs.isFile("test"); // Error (not exists)
await fs.isFile("folder"); // false 
await fs.isFile("folder/subfolder"); // false 
await fs.isDirectory("folder"); // true
await fs.isDirectory("folder/subfolder"); // true 

await fs.deleteFile("file"); // delete file
await fs.deleteDirectory("folder"); // delete directory
await fs.deleteDirectory("folder/subfolder2"); // delete subfolder 
await fs.deleteDirectory("folder", true); // delete directory with recursive
```
