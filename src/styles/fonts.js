import TTNormsBold from '../assets/fonts/TTNorms-Bold.ttf';
import TTNormsHeavy from '../assets/fonts/TTNorms-Heavy.ttf';
import TTNormsMedium from '../assets/fonts/TTNorms-Medium.ttf';
import TTNormsRegular from '../assets/fonts/TTNorms-Regular.ttf';

const ttnorms_regular = {
  fontFamily: 'TT Norms',
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
        local('TTNorms-Regular'),
        url(${TTNormsRegular}) format('truetype')
    `
};

const ttnorms_medium = {
  fontFamily: 'TT Norms',
  fontStyle: 'normal',
  fontWeight: 500,
  src: `
        local('TTNorms-Medium'),
        url(${TTNormsMedium}) format('truetype')
    `
};

const ttnorms_bold = {
  fontFamily: 'TT Norms',
  fontStyle: 'normal',
  fontWeight: 700,
  src: `
        local('TTNorms-Bold'),
        url(${TTNormsBold}) format('truetype')
    `
};

const ttnorms_heavy = {
  fontFamily: 'TT Norms',
  fontStyle: 'normal',
  fontWeight: 800,
  src: `
        local('TTNorms-Heavy'),
        url(${TTNormsHeavy}) format('truetype')
    `
};

export default [ttnorms_regular, ttnorms_medium, ttnorms_bold, ttnorms_heavy];