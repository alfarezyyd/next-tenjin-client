import LandingWrapper from "/components/landing/LandingWrapper";
import Articles from '/components/landing/Articles/index';

export default function Page(props) {
  return (
    <LandingWrapper>
      <Articles/>
    </LandingWrapper>
  )
}