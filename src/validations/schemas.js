import joi from 'joi';

const youtubeRegex = /youtube\.com\/watch\?v=/;

const validateNewRecommendation = joi.object({
  name: joi.string().required(),
  youtubeLink: joi.string().uri().pattern(new RegExp(youtubeRegex)).required(),
});

export default validateNewRecommendation;
