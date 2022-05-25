import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import ProperyList from '../../components/properyList/ProperyList'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import './home.css'

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <div className='homeContainer'>
        <Featured />
        <ProperyList />
        <MailList/>
        <Footer/> 
      </div>
    </>
  )
}

export default Home
