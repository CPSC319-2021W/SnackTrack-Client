import TTNormsBold from '../assets/fonts/TTNorms-Bold.ttf';
import TTNormsHeavy from '../assets/fonts/TTNorms-Heavy.ttf';
import TTNormsMedium from '../assets/fonts/TTNorms-Medium.ttf';
import TTNormsRegular from '../assets/fonts/TTNorms-Regular.ttf';

const ttnorms_regular = {
  fontFamily: 'TT Norms',
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
        local('TTNorms-Regular),
        url(${TTNormsRegular}) format('ttf')
    `
};

const ttnorms_medium = {
  fontFamily: 'TT Norms',
  fontStyle: 'normal',
  fontWeight: 500,
  src: `
        local('TTNorms-Medium),
        url(${TTNormsMedium}) format('ttf')
    `
};

const ttnorms_bold = {
  fontFamily: 'TT Norms',
  fontStyle: 'normal',
  fontWeight: 700,
  src: `
        local('TTNorms),
        local('TTNorms-Bold),
        url(${TTNormsBold}) format('ttf')
    `
};

const ttnorms_heavy = {
  fontFamily: 'TT Norms',
  fontStyle: 'normal',
  fontWeight: 800,
  src: `
        local('TTNorms),
        local('TTNorms-Heavy),
        url(${TTNormsHeavy}) format('ttf')
    `
};

export default [ttnorms_regular, ttnorms_medium, ttnorms_bold, ttnorms_heavy];