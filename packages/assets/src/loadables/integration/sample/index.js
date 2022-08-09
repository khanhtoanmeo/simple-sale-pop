import loadable from 'react-loadable';
import Loading from '@assets/components/atoms/Loading';

export default loadable({
  loader: () => import('../../../pages/integration/sample'),
  loading: Loading
});