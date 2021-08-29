import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
import {
  getServicesHeadings,
  getServicesSearchTitle,
  getServicesItems,
} from "../STORE/selectors";
import {
  fetchServicesHeadings,
  fetchServicesSearchTitle,
  fetchServicesCategoryItems,
  // fetchOurServices,
  // setOurServicesUrlValid,
} from "../STORE/actions";
import { stateTypes } from "../types";
// import { tabs } from "../STORE/constants";

function useEffectServicesHeadings() {
  const headingsMounted = useSelector(getServicesHeadings).shouldFetch;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!headingsMounted) return;
    let mounted = true;
    if (!mounted) return;
    // console.log("Fetching Headings");
    dispatch(fetchServicesHeadings());

    return () => {
      mounted = false;
    };
  }, [headingsMounted, dispatch]);
}

function useEffectServicesTitle() {
  const destination = useSelector((state: stateTypes) => state.destination);
  const titleMounted = useSelector(getServicesSearchTitle).shouldFetch;
  const dispatch = useDispatch();
  const isAllowed =
    titleMounted && Object.values(destination).every((val) => val !== "");
  useEffect(() => {
    if (!isAllowed) return;
    let mounted = true;
    if (!mounted) return;

    // console.log("allowed title");
    dispatch(fetchServicesSearchTitle());

    return () => {
      mounted = false;
    };
  }, [isAllowed, dispatch]);
}

function useEffectItems() {
  const servicesItems = useSelector(getServicesItems);
  const dispatch = useDispatch();
  const accessBlocked =
    (servicesItems && !servicesItems.shouldFetch) || !servicesItems;

  useEffect(() => {
    if (accessBlocked) {
      return;
    }

    let mounted = true;
    if (!mounted) return;
    // console.log("Fetching Items");

    dispatch(fetchServicesCategoryItems());

    return () => {
      mounted = false;
    };
  }, [accessBlocked, dispatch]);
}

export function useEffectFetchData():void {
  // ------------>#2 fetch Headings<------------
  useEffectServicesHeadings();
  // ------------>#3 fetch Title for category<------------
  // console.log(servicesSearchTitle);
  // console.log(destination);
  useEffectServicesTitle();
  // ------------>#3 fetch Items For the current title<------------
  useEffectItems();
}

/* --------------------------><----------------------- */

// function useEffectPath() {
//   const servicesTitle = useSelector(getServicesSearchTitle).servicesTitle;
//   const history = useHistory();

//   useEffect(() => {
//     const {
//       destination: { country, city },
//       tab,
//       category,
//     } = servicesTitle;
//     // console.log({country, city, activeTab, category});
//     if (!country || !city || !tab || !category) return;
//     console.log("Url Set");
//     history.push(`/services/${tab}/${country}/${city}/${category}`);
//   }, [servicesTitle, history]);
// }

// ****
// export function useEffectOurServicesOnMount() {
//   const { tabParam, countryParam, cityParam, categoryParam } = useParams<any>();
//   const {
//     destination: { country, city },
//     tab,
//     category,
//   } = useSelector(getServicesSearchTitle).servicesTitle;
//   const dispatch = useDispatch();

//   useEffectPath();

//   useEffect(() => {
//     if (
//       tabParam === tab &&
//       countryParam === country &&
//       cityParam === city &&
//       categoryParam === category
//     ){

//       return;
//     }
//     if (!(tabs.indexOf(tabParam) > -1)) {
//       dispatch(setOurServicesUrlValid(false));
//       return;
//     }
//     console.log("our Services Fetcher");

//     dispatch(
//       fetchOurServices({ tabParam, countryParam, cityParam, categoryParam })
//     );
//     // eslint-disable-next-line
//   }, []);
// }
