const ipfsClient = require('ipfs-http-client')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const fs = require('fs')

const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({ pinataJWTKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYWQ0YzczYS02OTk1LTQ2OGItOWQ2MC1hNzVhMjBjMDg1ZTciLCJlbWFpbCI6ImtyaXNkaWFudG8uYW5kcmlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjFiNGE5YzcxZDE3NTA0ODNjNTA1Iiwic2NvcGVkS2V5U2VjcmV0IjoiY2FlNjIyYzM4YWRhOWRjN2MxNGNkYzk5MDU1MWFlMjIzOTliZDRjODU5Nzk1YzFjYTZmOGJhMWJkMGM2NzFlNCIsImlhdCI6MTcwNjc3NzcxN30.zl7l97HNGu3O7TfAHHUIlIEwQQlvgkwYZ-XkmK3eOnw' });
// const projectId = '2JRgSlpcFAFTDTvmS9ntQqfFkUZ';
// const projectSecret = '29ffe1fe5dee36c49c82a6ad045c3259';
// const auth =
    // 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
// const ipfs = new ipfsClient({
//     host: 'api.pinata.cloud/pinning/pinFileToIPFS',//'ipfs.infura.io',
//     port: 443,
//     protocol: 'https',
//     headers: {
//        // 'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
//         'Authorization': `Bearer ${"26b391f18a0b6c56e670"}`
//       }})


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
     const filePath =   './files/' + fileName
     file.mv(filePath, async (err) => {
         if (err) {
            console.log(err)
            console.log('error: failed to download the file.')
            return res.status(500).send(err)
         }
     const fileHash = await addFile(fileName, filePath)
     res.render('upload', {fileName, fileHash})
     })
})

const addFile = async (fileName, filePath) => {
    // const file = fs.readFileSync(filePath)
    const stream = fs.createReadStream(filePath)
    let options = {
        pinataMetadata: {
            name: fileName
        }
    }
    if (filePath.substr(filePath.length - 4) !== ".png")
    {
        options = {
            pinataMetadata: {
                name: fileName
            },
            pinataOptions: {
                cidVersion: 0, 
                wrapWithDirectory: true
            }
        }
    }
//    const fileAdded = await ipfs.add({path:fileName, content:file},{ wrapWithDirectory: true })
    const fileAdded = await pinata.pinFileToIPFS(stream, options)
      
    const fileHash = fileAdded.IpfsHash
    
    fs.unlinkSync(filePath)
    console.log(fileAdded)
    console.log(fileHash)
    
    return fileHash
}

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})