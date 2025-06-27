//import Navigate from "../components/Navigate";
import Lista from "../components/Lista";

/**
 * Renders the main menu component of the application.
 * 
 * The menu includes a header with a title, a paragraph indicating it's a menu,
 * and an anchor tag for potential navigation. It also integrates the Lista component
 * which is responsible for displaying information to interact with the backend.
 * The component is styled with Tailwind CSS classes for layout and appearance.
 * The component is in the left sidebar. (1/5 wide and 100 % height)
 */

function Menu () {
    return (
        <div className="bg-gray-800 ">
            <header className=" active: col-end-11">
                <h1 className="font-bold ring-white *:peer-focus-within:">Este es el menu Principal</h1>
                <p className="font-bold ring-white">Menu</p>
                <a 
                    className="font-bold ring-white in-enabled:"
                    //href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                ></a>
                <Lista/>
            </header>
        </div>
    );
}

export default Menu;