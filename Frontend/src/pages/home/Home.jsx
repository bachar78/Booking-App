import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import ProperyList from '../../components/properyList/ProperyList'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import MailList from '../../components/mailList/MailList'
import './home.css'

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <div className='homeContainer'>
        <Featured />
        <h1 className='homeTitle'>Browse By Property Type</h1>
        <ProperyList />
        <h1 className='homeTitle'>Homes guests love</h1>
        <FeaturedProperties/>
        <MailList/>
      </div>
    </>
  )
}

export default Home
