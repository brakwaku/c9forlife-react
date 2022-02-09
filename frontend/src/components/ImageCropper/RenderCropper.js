import { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { Button, IconButton, makeStyles } from "@material-ui/core";
import axios from "axios";
// import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";

import { SnackbarContext } from "../ImageCropper/RenderSnackBar";
import { dataURLtoFile } from "../../utilities/dataURLtoFile";
import getCroppedImg from "../../utilities/cropImage";
// import getCroppedImg, { generateDownload } from "../../utilities/cropImage";
import { BackdropContext } from "./SimpleBackdrop";

const useStyles = makeStyles({
  iconButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
  },
});

const RenderCropper = ({
  handleCropper,
  setPhotoURL,
  setCloudinaryId,
  oldId,
  userId,
}) => {
  const classes = useStyles();
  const inputRef = useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();

  const setStateSnackbarContext = useContext(SnackbarContext);
  const { closeBackdrop, showBackdrop } = useContext(BackdropContext);

  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  // const onDownload = () => {
  //   if (!image) {
  //     return setStateSnackbarContext(
  //       true,
  //       "Please select an image!",
  //       "warning"
  //     );
  //   }

  //   generateDownload(image, croppedArea);
  // };

  const onClear = () => {
    if (!image) {
      return setStateSnackbarContext(
        true,
        "Please select an image!",
        "warning"
      );
    }

    setImage(null);
  };

  const onUpload = async () => {
    if (!image) {
      return setStateSnackbarContext(
        true,
        "Please select an image!",
        "warning"
      );
    }

    const canvas = await getCroppedImg(image, croppedArea);
    const canvasDataUrl = canvas.toDataURL("image/jpeg");
    const convertedUrlToFile = dataURLtoFile(
      canvasDataUrl,
      "cropped-image.jpeg"
    );

    const formData = new FormData();
    formData.append("image", convertedUrlToFile);
    formData.append("oldId", oldId);
    formData.append("userId", userId);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      showBackdrop();

      const { data } = await axios.post("/api/upload", formData, config);

      setPhotoURL(data.secure_url);
      setCloudinaryId(data.public_id);
      closeBackdrop();
      handleCropper();
    } catch (error) {
      console.error(error);
      closeBackdrop();
    }
  };

  return (
    <Container>
      <IconButtonWrapper className={classes.iconButton} onClick={handleCropper}>
        <i className="far fa-times-circle fa-2x"></i>
      </IconButtonWrapper>
      <ContainerCropper>
        {image ? (
          <>
            <CropperWrapper>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </CropperWrapper>
            <SliderWrapper>
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </SliderWrapper>
          </>
        ) : null}
      </ContainerCropper>
      <ContainerButtons className="container-buttons">
        <input
          type="file"
          accept="image/"
          ref={inputRef}
          hidden
          onChange={onSelectFile}
        />
        <Button
          onClick={() => onClear()}
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={triggerFileSelectPopup}
          style={{ marginRight: "10px" }}
        >
          Choose
        </Button>
        {/* <Button
          variant="contained"
          color="secondary"
          onClick={onDownload}
          style={{ marginRight: "10px" }}
        >
          Download
        </Button> */}
        <Button variant="contained" color="secondary" onClick={onUpload}>
          Set
        </Button>
      </ContainerButtons>
    </Container>
  );
};

export default RenderCropper;

const Container = styled.div`
  height: 95vh;
  width: 100vw;
  position: relative;
  margin-top: 30rem;
  background-color: #00000080;
`;

const ContainerCropper = styled.div`
  height: 90%;
  padding: 10px;
`;

const CropperWrapper = styled.div`
  height: 90%;
  position: relative;
`;

const SliderWrapper = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  margin: auto;
  width: 60%;
`;

const ContainerButtons = styled.div`
  border: 1px solid #f5f5f5;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const IconButtonWrapper = styled(IconButton)`
  > i {
    :hover {
      color: red !important;
    }
  }
`;
