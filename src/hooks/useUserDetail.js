export default () => {
    const getUserDetail = async () => {
        const token = localStorage.getItem("authToken");
        const riderId = localStorage.getItem("riderId");
    
        if (!riderId) {
        //   setError("Rider ID not found. Please log in again.");
        //   setLoading(false);
          return;
        }
    
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/rider/riders/${riderId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (response.ok) {
            const data = await response.json();
            const rider = data.rider
            return rider
          } else {
            throw new Error("Failed to fetch User Details")
          }
        } catch (err) {
        //   setError(`There was a problem with the fetch operation: ${err.message}`)
          return { err: 'Failed to fetch Detail' }

        }
      }
    return {
        getUserDetail
    }
}