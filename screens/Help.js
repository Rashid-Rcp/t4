// for temporary purpose 
// storing data for future usage


#0a2351 => blue


useEffect(() => {
    // axios.post(global.APILink+'/user', { test:'okoko' })
    // .then(res => {
    //   console.log(res.data);
    // })
    // .catch(err => console.log(err));

// axios.get(global.APILink+'/user')
//   .then(res => {
//     //const persons = res.data;
//     console.log(res.data);
//   })
//   .catch(err => console.log(err));

  },[]);



  const testing = async () => {
        
    try {
     
      const credentials = await SecureStore.getItemAsync('t4_user_id');
      console.log('value of credentials: ', credentials);

      if (credentials) {
        
      }
    } catch (e) {
      console.log(e);
    }
  };
testing();