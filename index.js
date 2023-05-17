const ipfsClient = require('ipfs-http-client')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const projectId = '2JRgSlpcFAFTDTvmS9ntQqfFkUZ';
const projectSecret = '29ffe1fe5dee36c49c82a6ad045c3259';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfs = new ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
})
const app = express()
app.use(cors({origin: '*'}));
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))

app.use(fileUpload())


app.get('/', (req,res) => {
    res.render('home')
    console.log('home hit')
})

app.post('/upload', (req, res) => {
     const file = req.files.file
     const fileName = req.body.filename
     console.dir(req);
     const filePath =   './files/' + fileName
     file.mv(filePath, async (err) => {
         if (err) {
            console.log('error: failed to download the file.')
            return res.status(500).send(err)
         }
     const fileHash = await addFile(fileName, filePath)
     fs.unlink(filePath, (err) =>{
         if (err) console.log(err)
     })  
     res.render('upload', {fileName, fileHash})
     })
})

const addFile = async (fileName, filePath) => {
    const file = fs.readFileSync(filePath)
   const fileAdded = await ipfs.add({path:fileName, content:file},{ wrapWithDirectory: true })
  


   const fileHash = fileAdded.cid
  console.log(fileAdded)
    return fileHash
}

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})