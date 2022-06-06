import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/propertyList/PropertyList'
import Footer from '../../components/footer/Footer'
import './home.css'

const Home = () => {
  console.log(process.env.REACT_APP_SERVER_URL)
  return (
    <>
      <Navbar />
      <Header />
      <div className='homeContainer'>
        <Featured />
        <PropertyList />
        <Footer/> 
      </div>
    </>
  )
}

export default Home
