const routeLoader = config => {
  const {
    getData,
    getView,
    Loader,
  } = config;

  class RouteLoader extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        data: null,
        Page: null,
      };
    }
  
    componentWillMount() {
      getView(Page => this.setState({ Page }));
    
      getData(this.props).then(
        data => this.setState({ data }),
        error => this.setState({ error })
      );
    }
    
    render() {
      const {
        data,
        Page,
      } = this.state;
    
      if (!data || !Page) {
        return Loader ? <Loader /> : null;
      }
    
      return (
        <Page
         {...this.props}
         data={data}
        />
      );
    }
  }

  return RouteLoader;
};

// Build a specific route loader for an About page.
const AboutPage = routeLoader({
  getView: done => require(['./about/Page'], done),
  getData: getPageData('/about'),
});

// Render the route; this example uses react-router.
<Route
  path="/about"
  component={AboutPage}
/>