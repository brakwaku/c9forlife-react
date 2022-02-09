import { useRef, useState, useEffect, useContext } from "react";
import {
  IconButton,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import RenderCropper from "./RenderCropper";
import { SnackbarContext } from "../ImageCropper/RenderSnackBar";
import axios from "axios";
import userprofileimage from "../../assets/personPlaceholder.png";

const useStyles = makeStyles((theme) => ({
  cameraIcon: {
    height: "2.5rem",
    width: "2.5rem",
    position: "absolute",
    bottom: "0",
    right: "30px",
    background: "white",

    "&:hover": {
      backgroundColor: "white",
    },
  },
}));

const Avatar = ({ setPhotoURL, setCloudinaryId, photoURL, oldId, userId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const setStateSnackbarContext = useContext(SnackbarContext);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const [showCropper, setShowCropper] = useState(false);

  const handleCropper = () => setShowCropper((prevValue) => !prevValue);
  const handleRemove = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post('/api/upload/delete', {id: oldId, userId: userId}, config);

      if (data.result === 'not found') {
        return setStateSnackbarContext(
          true,
          "Profile image removed successfully.",
          "success"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AvatarContainer>
        <AvatarWrapper>
          <AvatarImage
            src={photoURL === "sample" ? userprofileimage : photoURL}
            alt="Avatar"
          />
        </AvatarWrapper>
        <IconButton
          className={classes.cameraIcon}
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <i className="fas fa-camera fa-1x"></i>
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {/* <MenuItem onClick={handleClose}>View</MenuItem> */}
                    <MenuItem
                      onClick={(e) => {
                        handleCropper();
                        handleClose(e);
                      }}
                    >
                      Change
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        handleRemove();
                        handleClose(e);
                      }}
                    >
                      Remove
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </AvatarContainer>

      {showCropper && (
        <RenderCropper
          handleCropper={handleCropper}
          setPhotoURL={setPhotoURL}
          setCloudinaryId={setCloudinaryId}
          oldId={oldId}
          userId={userId}
        />
      )}
    </>
  );
};

export default Avatar;

const AvatarContainer = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AvatarWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #f5f5f5;
  overflow: hidden;
  border: 4px solid #f5f5f5;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
`;

// const CameraIconWrapper = styled(IconButton)`
//   height: 4rem;
//   width: 4rem;
//   position: absolute;
//   bottom: 0;
//   right: 100px;
//   background: #ffffff;
// `;
