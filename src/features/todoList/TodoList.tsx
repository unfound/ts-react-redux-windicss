import Header from "./Header"
import List from "./List"
import Footer from "./Footer"

export default function TodoList ():JSX.Element {
    return (
        <div className="mx-auto my-6 w-3/4">
            <Header />
            <List />
            <Footer />
        </div>
    )
}