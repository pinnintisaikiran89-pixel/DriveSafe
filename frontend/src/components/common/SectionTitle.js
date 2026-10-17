function SectionTitle({

    title,

    subtitle

}) {

    return (

        <div className="mb-5">

            <h2 className="

                text-2xl

                font-black

                text-slate-900

            ">

                {title}

            </h2>

            <p className="

                text-slate-500

                mt-1

            ">

                {subtitle}

            </p>

        </div>

    );

}

export default SectionTitle;