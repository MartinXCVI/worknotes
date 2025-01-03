// React router imports
import { Outlet, Link } from "react-router-dom";

// React hooks imports
import { useEffect, useRef, useState } from "react";

// Redux imports
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

// Custom hooks imports
import usePersist from "../../hooks/usePersist";

// React spinners imports
import { PulseLoader } from "react-spinners";


const PersistLogin = () => {

  const [persist] = usePersist()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [
    refresh,
    {
      isUninitialized,
      isLoading,
      isSuccess,
      isError,
      error
    }
  ] = useRefreshMutation()

  useEffect(()=> {

    if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
      const verifyRefreshToken = async ()=> {
        console.log('Verifying refresh token')
        try {
          //const response = 
          await refresh()
          //const { accessToken } = response.data
          setTrueSuccess(true)
        }
        catch(error) {
          console.error(error)
        }
      }
      if(!token && persist) verifyRefreshToken()
    }
    return ()=> effectRan.current = true
    // eslint-disable-next-line
  }, [])

  let content

  if(!persist) { // persist: no
    console.log('no persist')
    content = <Outlet />
  } else if(isLoading) { // persist: yes, token: no
    console.log('loading')
    content = <PulseLoader color={"#FFF"} />
  } else if(isError) { // persist: yes, token: no
    console.log('error')
    content = (
      <p className='error-msg'>
        {`${error?.data?.message} — `}
        <Link to="/login">Please login again</Link>.
      </p>
    )
  } else if(isSuccess && trueSuccess) { //persist: yes, token: yes
    console.log('success')
    content = <Outlet />
  } else if(token && isUninitialized) { //persist: yes, token: yes
    console.log('token and uninit')
    console.log(isUninitialized)
    content = <Outlet />
  }

  return content
}

export default PersistLogin