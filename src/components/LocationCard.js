import clsx from 'clsx'

export default function LocationCard({location, big}) {
    return <div className={clsx('location', big && 'big')} key={location.id}>
        <img className="locationImage" src={`img/locations/${location.id}.jpg`}/>
        <div className="locationName">
            <h3>
                {location.name}
            </h3>
        </div>
    </div>
}
