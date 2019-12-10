import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { percentageContext } from '../context/PercentageProvider';
import mapValue from '../utils/mapValue';
import images from '../images';
// import PropTypes from 'prop-types';

const Container = styled.div`
  align-items: center;
  background-color: #000;
  left: 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  top: 0;
`;

const CloseAd = styled.button`
  appearance: none;
  background-color: #000;
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 3rem;
  height: 4rem;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 4rem;
`;


const Ad = styled.img`
  height: 100vh;
  width: 100vw;
  object-fit: contain;
`;

const Ads = () => {
  const [ad, setAd] = useState(false);
  const { percentage } = useContext(percentageContext);
  useEffect(() => {
    if (percentage < 0 && !ad) {
      const adChance = Math.floor(Math.random() * 150);
      const chance = mapValue(percentage, -100, -1, 10, 100);
      console.log(adChance, chance);
      if (adChance > chance) {
        setAd(Math.floor(Math.random() * images.length));
      }
    }
  }, [ad, percentage]);
  return ad !== false && (
    <Container>
      <CloseAd onClick={() => setAd(false)}>X</CloseAd>
      <Ad src={images[ad]} />
    </Container>
  );
};

Ads.propTypes = {};

export default Ads;
