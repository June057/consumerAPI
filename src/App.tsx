import { useEffect, useState } from "react";
import ItemDetails from "./Components/ItemDetails";
import "./App.css";

function App() {
  interface item {
    name: string;
    showDetails: boolean;
    image_link: string;
  }
  interface error {
    message: string;
    showError: false;
  }
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [error, setError] = useState<error>({ message: "", showError: false });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://zoo-animal-api.herokuapp.com/animals/rand/10"
        );
        const files = await response.json();
        setData(files);
        setLoader(false);
      } catch (error: any) {
        setLoader(false);
        error.showError = true;
        setError(error);
        throw error;
      }
    };
    getData();
  }, []);

  return (
    <div className="App">
      <>
        {loader && <p>Data Loading...</p>}
        <header className="App-header">
          API Consumer
          {error?.showError ? (
            <p>{error?.message || "Something went wrong!!"}</p>
          ) : (
            data.map((item: item, index: number) => {
              return (
                <>
                  <p
                    onClick={() =>
                      setData(
                        Object.assign([...data], {
                          [index]: { ...item, showDetails: true },
                        })
                      )
                    }
                  >
                    {item.name}
                  </p>
                  {item.showDetails && <ItemDetails item={item} />}
                </>
              );
            })
          )}
        </header>
      </>
    </div>
  );
}

export default App;
