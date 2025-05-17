import Container from "../Container";
import HeaderLeft from "./HeaderLeft";
import HeaderLogo from "./HeaderLogo";
import HeaderRight from "./HeaderRight";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header className="bg-white   border-b border-b-gray-400 py-5">
      <Container className="flex items-center justify-between">
        <div className="w-auto md:w1/3 flex items-center justify-center gap-2.5">
          <MobileMenu />
          <HeaderLeft />
        </div>

        <HeaderLogo title="LEO" />

        <HeaderRight />
      </Container>
    </header>
  );
};

export default Header;
