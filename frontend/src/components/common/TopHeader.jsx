function TopHeader({

    greeting,

    name,

    subtitle

}) {

    return (

        <div className="mb-8 fade-down">

            <p className="text-slate-500">

                {greeting}

            </p>

            <h1 className="text-3xl font-black mt-1">

                {name} 👋

            </h1>

            <p className="text-slate-500 mt-2">

                {subtitle}

            </p>

        </div>

    );

}

export default TopHeader;