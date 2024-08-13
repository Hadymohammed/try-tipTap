import { formatTime } from '@/utils/utils'
import { DownOutlined, PlusOutlined } from '@ant-design/icons'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import { Dropdown } from 'antd'
import React from 'react'

export default (props:any) => {
    const {start, end, speaker} = props.node.attrs

    console.log(start, end, speaker)
  return (
    <NodeViewWrapper className="w-full p-2 bg-red">
      {/* <label contentEditable={false} className='m-2'>Segment Component</label> */}
      <div
			className="flex items-start w-full gap-4 mt-6 p-2 hover:bg-gray-100 rounded-lg"
            data-start={start}
            data-end={end}
            data-speaker={speaker}
		>
            <div className="w-1/6 mt-8">
				<Dropdown
					className="cursor-pointer"
					menu={{
						items: [
							// ...speakers,
							{
								label: "إضافة متحدث",
								key: "add-speaker",
								icon: <PlusOutlined style={{ fontSize: 12 }} />,
								className: "bg-gray-50",
								// onClick: () => setModalOpen(true),
							},
						],
					}}
				>
					{/* <Button type="text"> */}
					<span>
						{"بدون متحدّث"}
						<DownOutlined
							className="ms-1"
							style={{ fontSize: 12 }}
						/>
					</span>
					{/* </Button> */}
				</Dropdown>
			</div>
			<div className="w-4/6 grow border-e pe-2">
				<input
					className="block mb-2 ms-auto bg-transparent text-end w-48"
					disabled={true}
					readOnly={true}
					type="text"
                    value={formatTime(start)}
				/>
                <NodeViewContent className="p-2" />
			</div>
			<label className="mt-8">
				<input
					type="checkbox"
					className="peer checked:accent-green-700 accent-black rounded-lg transition duration-150 ease-in-out"
				/>
				<span className="ms-2 text-sm peer-checked:text-green-700">
					تم
				</span>
			</label>
		</div>

    </NodeViewWrapper>
  )
}