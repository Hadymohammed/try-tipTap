import EditorBlock from "@/Components/Editor/EditorBlock";

export default function page() {

    return (
        <div>
            <h1>Editor Page</h1>
            <div className="flex justify-center">
                <div className="w-2/3">
                    <EditorBlock />
                </div>
            </div>
        </div>
    )
}