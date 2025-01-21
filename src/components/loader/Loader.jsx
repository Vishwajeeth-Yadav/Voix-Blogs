import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledOverlay>
      <StyledWrapper>
        <div className="loader">
          <div className="box box-1">
            <div className="side-left" />
            <div className="side-right" />
            <div className="side-top" />
          </div>
          <div className="box box-2">
            <div className="side-left" />
            <div className="side-right" />
            <div className="side-top" />
          </div>
          <div className="box box-3">
            <div className="side-left" />
            <div className="side-right" />
            <div className="side-top" />
          </div>
          <div className="box box-4">
            <div className="side-left" />
            <div className="side-right" />
            <div className="side-top" />
          </div>
        </div>
      </StyledWrapper>
    </StyledOverlay>
  );
}

// New overlay component to center the loader
const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    height: 30px;
    width: 20px;
    scale: 3;  /* Increased scale from 1.5 to 3 */
  }

  .box {
    position: relative;
    opacity: 0;
    left: 5px;
  }

  .side-left {
    position: absolute;
    background-color: #286cb5;
    width: 10px;
    height: 3px;
    transform: skew(0deg, -25deg);
    top: 7px;
    left: 5px;
  }

  .side-right {
    position: absolute;
    background-color: #2f85e0;
    width: 10px;
    height: 3px;
    transform: skew(0deg, 25deg);
    top: 7px;
    left: -5px;
  }

  .side-top {
    position: absolute;
    background-color: #5fa8f5;
    width: 12px;
    height: 12px;
    rotate: 45deg;
    transform: skew(-20deg, -20deg);
  }

  .box-1 {
    animation: from-left 2s infinite;
  }

  .box-2 {
    animation: from-right 2s infinite;
    animation-delay: 0.5s;
  }

  .box-3 {
    animation: from-left 2s infinite;
    animation-delay: 1s;
  }

  .box-4 {
    animation: from-right 2s infinite;
    animation-delay: 1.5s;
  }

  @keyframes from-left {
    0% {
      z-index: 20;
      opacity: 0;
      translate: -10px -3px;
    }

    20% {
      z-index: 10;
      opacity: 1;
      translate: 0px 0px;
    }

    40% {
      z-index: 9;
      translate: 0px 2px;
    }

    60% {
      z-index: 8;
      translate: 0px 4px;
    }

    80% {
      z-index: 7;
      opacity: 1;
      translate: 0px 6px;
    }

    100% {
      z-index: 5;
      translate: 0px 15px;
      opacity: 0;
    }
  }

  @keyframes from-right {
    0% {
      z-index: 20;
      opacity: 0;
      translate: 10px -3px;
    }

    20% {
      z-index: 10;
      opacity: 1;
      translate: 0px 0px;
    }

    40% {
      z-index: 9;
      translate: 0px 2px;
    }

    60% {
      z-index: 8;
      translate: 0px 4px;
    }

    80% {
      z-index: 7;
      opacity: 1;
      translate: 0px 6px;
    }

    100% {
      z-index: 5;
      translate: 0px 15px;
      opacity: 0;
    }
  }
`;

export default Loader;
