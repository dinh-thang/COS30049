const ReportList = () => {
    
    "THIS IS THE PLACE HOLDER VERSION OF THE REPORT LIST ONLY."
    
    const tableCategories = ["Id", "File Name", "Vulnerability Rating (100)", "Date Uploaded", "Detail Report"]
    var sampleTableData = [
        ["1", "contract1.sol", "48", "7/5/2021", "Details"],
        ["2", "contract2.sol", "67", "8/5/2022", "Details"],
        ["3", "contract3.sol", "49", "5/5/2023", "Details"],
    ]
    
    return (
        <div className="flex justify-center">
            <table className="table">
                <thead>
                    <tr>
                        {/* looping through the tableCategories list */}
                        {tableCategories.map((category, index) => (
                            <th key={index} class="px-4 py-2">{category}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* looping through all the sampleTableData records */}
                    {/* a fixed number of td tags are used for sample displaying purpose only */}

                    {sampleTableData.map((record, index) => (
                        <tr key={index}>
                            <td class="border px-4 py-2">{record[0]}</td>
                            <td class="border px-4 py-2">{record[1]}</td>
                            <td class="border px-4 py-2">{record[2]}</td>
                            <td class="border px-4 py-2">{record[3]}</td>
                            <td class="border px-4 py-2">{record[4]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReportList