import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to LSC',
  description: 'We support the AFP with neccessary military equipments',
  keywords: 'military, equipments, firearms, ammunitions',
};

export default Meta;
