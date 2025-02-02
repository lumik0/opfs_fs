# OPFS FS

OPFS: https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system

# Example:
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
