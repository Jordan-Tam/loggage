export default async function List({ params}) {
    const { id } = await params;

    return (
        <main>
            <p>{id}</p>
        </main>
    )
}