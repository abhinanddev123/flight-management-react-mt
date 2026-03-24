import { createContext, useContext, useReducer } from "react";


const FlightContext = createContext();


const initialState = {
    flightDetails : [],
    filteredDetails : [],
    totalFlights : 0,
    processing : false,
    error : false,
    msg : ''
}

    function reducer(state, action){

        switch(action.type){
                case "add":
                    return {...state,flightDetails:[...state.flightDetails,action.payload], totalFlights:state.flightDetails.length+1}

                case "filter":
                    
                    const {names,minPrice,maxPrice,dep,arr} = action.payload;
                    const data = state.flightDetails.filter((item) => {
                        return (
                        (names === '' || item.name.toLowerCase().includes(names.toLowerCase())) &&
                        (minPrice === '' || item.price >= Number(minPrice)) &&
                        (maxPrice === '' || item.price <= Number(maxPrice)) &&
                        (dep === '' || item.dep >= dep) &&
                        (arr === '' || item.arr <= arr)
                        );
                    });

                    return {...state,filteredDetails: data}

              case "sort":
                    const field = action.payload.field;

                    switch(action.payload.direction){
                        case "asc":

                        if(field == 'arr' || field == 'dep'){
                            return {
                                ...state,
                                filteredDetails: [...state.filteredDetails].sort((a, b) => {
                                const valA = timeToMinutes(a[field]);
                                const valB = timeToMinutes(b[field]);
                                console.log(valA,valB);
                                return valA - valB;
                                })
                         }
                        }
                        return {
                            ...state,
                            filteredDetails: [...state.filteredDetails].sort((a, b) => {
                            console.log(a[field], b[field]);
                            return Number(a[field]) - Number(b[field]);
                            })
                        };

                        case "desc":


                        if(field == 'arr' || field == 'dep'){
                            return {
                                ...state,
                                filteredDetails: [...state.filteredDetails].sort((a, b) => {
                                const valA = timeToMinutes(a[field]);
                                const valB = timeToMinutes(b[field]);
                                console.log(valA,valB);
                                return valB - valA;
                                })
                         }
                        }

                        return {
                            ...state,
                            filteredDetails: [...state.filteredDetails].sort((a, b) =>
                            Number(b[field]) - Number(a[field])
                            )
                        };

                        default:
                        return state;
                    }


                case "processing":
                    return {...state,processing:true}
                case "completed":
                    return {...state,processing:false,msg:'Success'}
                case "error":
                    return {...state,processing:false,msg:'Error'}
                default:
                     return state;
            }


    }

function timeToMinutes(time) {
    console.log(time)
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function FlightProvider({children}){

    const [{flightDetails,filteredDetails,totalFlights,processing,error,msg},dispatch] = useReducer(reducer,initialState);



    function addFlightDetails(data){
        dispatch({type:"add",payload:data});
    }

    function filerFlightData(data){
        dispatch({type: "filter", payload:data})
    }   

    function sortFlightData(field,direction){
        dispatch({type:"sort", payload:{field,direction}})
    }


    return <FlightContext.Provider value={{flightDetails,filteredDetails,totalFlights,processing,error,msg,addFlightDetails,filerFlightData,sortFlightData}}>
                {children}
          </FlightContext.Provider>

}


export function useFlightDetails(){
    return useContext(FlightContext);
}

export default FlightProvider;