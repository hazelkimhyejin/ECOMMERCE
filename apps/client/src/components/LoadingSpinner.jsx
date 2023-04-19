import { ColorRing } from  'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoadingSpinner = () => {
  return (
    
    <ColorRing
    visible={true}
    height="80"
    width="80"
    ariaLabel="blocks-loading"
    wrapperStyle={{margin: 'auto', marginTop: '25px'}}
    wrapperClass="blocks-wrapper"
    colors={['#1F2937', '#4B5563', '#9CA3AF', '#6B7280', '#111827']}
    />
    
  )
}

export default LoadingSpinner