import styled from "styled-components";
import media from "../utilities/media";
import Rating from "./Rating";

/**
 * primary - Determines color of the title / head
 * head - This is the title
 * image - background image url or path
 * rating - Boolean which determines if the rating component should be displayed
 */

const Hero = ({
  head,
  quote,
  quoteBy,
  image,
  rating,
  primary,
  comps,
  archs
}) => {
  return (
    <MainWrapper
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
      }}
    >
      <div>
        <h1 style={{ color: `${primary}` }}>{head}</h1>
        <h3>
          {quote && `"${quote}"`}
          <br /> {quoteBy && quoteBy}
        </h3>
      </div>
      <div>
        {rating && (
          <>
            <h5 className="font-weight-bold">Stars</h5>
            <Rating comps={comps ? comps : []} archs={archs ? archs : []} />
          </>
        )}
      </div>
    </MainWrapper>
  );
};

Hero.defaultProps = {
  primary: 'rgb(230, 158, 23)',
}

export default Hero;

const MainWrapper = styled.div`
  /* Linear-gradient to add a darken background effect to the image. This will make the text easier to read */
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.image}); */
  /* Set a specific height */
  max-height: 40vh;
  min-height: 30vh;
  /* Position and center the image to scale nicely on all screens */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  justify-content: center;
  align-items: center;

  ${media.small`
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    `}

  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > h1 {
      font-size: 8vw;
      font-weight: bolder;

      ${media.small`
        font-size: 3.2rem;
      `}
    }

    > h3 {
      font-weight: bolder;
      color: orange;
    }
  }

  > div:nth-child(2) {
    > h5 {
      color: white;
    }
  }
`;
