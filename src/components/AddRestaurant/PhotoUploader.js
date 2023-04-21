import { useDropzone } from "react-dropzone";
import React, { useCallback, useState } from "react";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Typography } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const PhotoUploader = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFiles((prevSelectedFiles) => {
      props.setSecImg([...prevSelectedFiles, ...acceptedFiles])
      return [...prevSelectedFiles, ...acceptedFiles];
    });
    
    // console.log("from drop",selectedFiles);
  },[props]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Accept only image files
    multiple: true, // Enable multiple file selection
  });

  const removeFile = (file) => {
    setSelectedFiles((prevSelectedFiles) => {
      const index = prevSelectedFiles.indexOf(file)
      const newSelectedFiles = [...prevSelectedFiles];
      newSelectedFiles.splice(index, 1);
      props.setSecImg(newSelectedFiles)
      return newSelectedFiles;
    })
    // const prevFiles = selectedFiles.filter((_,i) => index!==i)
    // setSelectedFiles(prevFiles)
    // console.log("from remove",selectedFiles);
  };

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Container sx={{ width: "100%", height: 200, border: "2px dashed grey", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }} >
        <CloudUploadIcon fontSize="large" />
        <div style={{padding:"0.5em"}}>Drag and drop Restaurant section's photos here</div>
        <div style={{padding:"0.5em"}}>Or <Link style={{color:"red"}}>choose files</Link></div>
      </Container>
      {/* <Paper>
        {selectedFiles.map((file) => (
          <Paper elevation={0} sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"0.5em", marginLeft:"1em"}}>
            <p>{file.name}</p>
            <Button>
              <BackspaceIcon sx={{color:"black"}} />
            </Button>
          </Paper>
        ))}
      </Paper> */}
      {
        selectedFiles.length===0 
        ? 
        null 
        : 
        <>
          <Typography sx={{marginTop:"1em",fontWeight:"bold"}}>Added Files</Typography>
          <ImageList sx={{ width: "100%", height: 300, marginTop:'1em' }} cols={5} rowHeight={164}>
            {selectedFiles.map((file,index) => (
              <ImageListItem key={index} sx={{position:"relative"}}>
                <img
                  src={URL.createObjectURL(file)}
                  srcSet={URL.createObjectURL(file)}
                  alt={file.name}
                  loading="lazy"
                />
                <Button sx={{position:"absolute", right:"0%", top:"3%"}} onClick={() => removeFile(file)}>
                  <HighlightOffIcon opacity="0.75" sx={{color:"black", outline:"none"}} />
                </Button>
              </ImageListItem>
            ))}
          </ImageList>
        </>
      }
      
    </div>
  );
};

export default PhotoUploader;
