// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import styled, { keyframes } from "styled-components";

// const checkIcon = `fas fa-check-circle`;
// const errorIcon = `fas fa-exclamation-circle`;
// const infoIcon = `fas fa-info-circle`;
// const warningIcon = `fas fa-exclamation-triangle`;

// const TypeToast = [
//   { title: "success", backgroundColor: "#5cb85c", icon: checkIcon },
//   { title: "danger", backgroundColor: "#d9534f", icon: errorIcon },
//   { title: "info", backgroundColor: "#5bc0de", icon: infoIcon },
//   { title: "warning", backgroundColor: "#f0ad4e", icon: warningIcon },
// ];

// export const newToast = (message, typeToast) => {
//   let re = TypeToast.find((t) => t.title === typeToast);
//   const id = Math.floor(Math.random() * 101 + 1);
//   let design = { id: id, description: message };
//   let leToast = { ...re, ...design };
//   return leToast;
// };

// const toast_in_left = keyframes
//   from {
// 	  transform: translateX(-100%);
	  
// 	}
// 	to {
// 	  transform: translateX(0);
// 	}
// `;

// const toast_in_right = keyframes
//   from {
// 	  transform: translateX(100%);
	  
// 	}
// 	to {
// 	  transform: translateX(0);
// 	}
// `;

// const handlePosition = (pos) => {
//   switch (pos) {
//     case "top-right":
//       return `top: 12px; right: 12px; transition: transform .6s ease-in-out; animation: ${toast_in_right} .7s;`;
//     case "bottom-right":
//       return `top: 12px; right: 12px; transition: transform .6s ease-in-out; animation: ${toast_in_right} .7s;`;
//     case "top-left":
//       return `top: 12px; right: 12px; transition: transform .6s ease-in; animation: ${toast_in_left} .7s;`;
//     case "bottom-left":
//       return `top: 12px; right: 12px; transition: transform .6s ease-in; animation: ${toast_in_left} .7s;`;
//     default:
//       return `top: 12px; right: 12px; transition: transform .6s ease-in-out; animation: ${toast_in_right} .7s;`;
//   }
// };

// const Toast = ({ toastList, position, autoDelete, autoDeleteTime }) => {
//   const [list, setList] = useState(toastList);

//   useEffect(() => {
//     setList([...toastList]);


//   }, [toastList]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (autoDelete && toastList.length && list.length) {
//         deleteToast(toastList[0].id);
//       }
//     }, autoDeleteTime);

//     return () => {
//       clearInterval(interval);
//     };

//     // eslint-disable-next-line
//   }, [toastList, autoDelete, autoDeleteTime, list]);

//   const deleteToast = (id) => {
//     const listItemIndex = list.findIndex((e) => e.id === id);
//     const toastListItem = toastList.findIndex((e) => e.id === id);
//     list.splice(listItemIndex, 1);
//     toastList.splice(toastListItem, 1);
//     setList([...list]);
//   };

//   return (
//     <>
//       <MainContainer className={handlePosition(position)}>
//         {list.map((toast, i) => (
//           <InnerContainer
//             key={i}
//             className={handlePosition(position)}
//             style={{ backgroundColor: toast.backgroundColor }}
//           >
//             <ButtonWrapper onClick={() => deleteToast(toast.id)}>
//               X
//             </ButtonWrapper>
//             <IconWrapper>
//               <i className={toast.icon}></i>
//             </IconWrapper>
//             <ContentWrapper>
//               <p>{toast.title}</p>
//               <p>{toast.description}</p>
//             </ContentWrapper>
//           </InnerContainer>
//         ))}
//       </MainContainer>
//     </>
//   );
// };

// Toast.propTypes = {
//   toastList: PropTypes.array.isRequired,
//   position: PropTypes.string,
//   autoDelete: PropTypes.bool,
//   autoDeleteTime: PropTypes.number,
// };

// export default Toast;

// const MainContainer = styled.div`
//   font-size: 14px;
//   box-sizing: border-box;
//   position: fixed;
//   z-index: 999999;
// `;

// const IconWrapper = styled.div`
//   float: left;
//   margin-right: 15px;

//   > i {
//     width: 30px;
//     height: 30px;
//     color: white;
//   }
// `;

// const ContentWrapper = styled.div`
//   > p:nth-child(1) {
//     font-weight: 700;
//     font-size: 16px;
//     text-align: center;
//     margin-top: 0;
//     margin-bottom: 6px;
//     width: 300px;
//     height: 18px;
//   }

//   > p:nth-child(2) {
//     margin: 0;
//     text-align: left;
//     height: 18px;
//     margin-left: -1px;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//   }
// `;

// const ButtonWrapper = styled.button`
//   position: relative;
//   right: -0.3em;
//   top: -0.3em;
//   float: right;
//   font-weight: 700;
//   color: #fff;
//   outline: none;
//   border: none;
//   text-shadow: 0 1px 0 #fff;
//   opacity: 0.8;
//   line-height: 1;
//   font-size: 16px;
//   padding: 0;
//   cursor: pointer;
//   background: 0 0;
//   border: 0;
// `;

// const InnerContainer = styled.div`
//   background: #fff;
//   transition: 0.3s ease;
//   position: relative;
//   pointer-events: auto;
//   overflow: hidden;
//   margin: 0 0 6px;
//   padding: 30px;
//   margin-bottom: 15px;
//   width: 300px;
//   max-height: 100px;
//   border-radius: 3px 3px 3px 3px;
//   box-shadow: 0 0 10px #999;
//   color: #000;
//   opacity: 0.9;
//   background-position: 15px;
//   background-repeat: no-repeat;

//   :hover {
//     box-shadow: 0 0 12px #fff;
//     opacity: 1;
//     cursor: pointer;
//   }

//   height: 50px;
//   width: 365px;
//   color: #fff;
//   padding: 20px 15px 10px 10px;
// `;




const Toast = ({ head, message, variant }) => {
    
  return (
    <div className={`toast show ${variant}`} role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header">
        <strong className="me-auto">{head}</strong>
        <small>{Date.now()}</small>
        <button
          type="button"
          className="btn-close ms-2 mb-1"
          data-bs-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div className="toast-body">{message}</div>
    </div>
  );
};

export default Toast;
