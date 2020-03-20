import './tailwind.scss';
import { Shell } from '../containers/Shell';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <Shell>
      <Component {...pageProps} />
    </Shell>
  );
}
