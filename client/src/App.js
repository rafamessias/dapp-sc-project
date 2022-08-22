import { EthProvider } from "./contexts/EthContext";
import ThemeProviderWrapper from "./theme/ThemeProvider";
import Header from "./components/Header";
import DappApp from "./components/DappApp";

function App() {
  return (
    <EthProvider>
      <ThemeProviderWrapper>
        <div id="App">
          <Header />
          <DappApp />
        </div>
      </ThemeProviderWrapper>
    </EthProvider>
  );
}

export default App;
