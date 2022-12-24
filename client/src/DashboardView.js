import SideBar from "./components/SideBar";
import Main from "./components/test1/Main";

const DashboardView = () => {
  return (
    <div className="d-flex justify-content-around w-100 flex-wrap">
      <SideBar />
      <Main />
    </div>
  );
};

export default DashboardView;
