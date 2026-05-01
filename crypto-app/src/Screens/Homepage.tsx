import { Home } from '../Components/Home';
import { Blockchain } from '../Components/Blockchain';
import { Referral } from '../Components/Referral';
import { Exchange } from '../Components/Exchange';
import { Vision } from '../Components/Vision';
import { Footer } from './Footer';

export function Homepage() {
  return (
    <div className="bg-[--bg-primary] pt-16">
      <Home />
      <Blockchain />
      <Referral />
      <Exchange />
      <Vision />
      <Footer />
    </div>
  );
}
