import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

const SortableRow = ({ id, serial, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : undefined,
    position: "relative",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? "opacity-90 shadow-lg ring-2 ring-blue-300 rounded-xl" : ""}
    >
      {children({
        dragHandle: (
          <button
            type="button"
            className="flex shrink-0 cursor-grab flex-col items-center gap-0.5 rounded-lg border border-slate-200 bg-white px-2 py-2 text-slate-500 hover:border-blue-300 hover:text-blue-600 active:cursor-grabbing"
            aria-label={`Drag to reorder item ${serial}`}
            {...attributes}
            {...listeners}
          >
            <GripVertical size={18} />
            <span className="text-[10px] font-bold">{serial}</span>
          </button>
        ),
      })}
    </div>
  );
};

/**
 * @param {Array} items
 * @param {(item: unknown, index: number) => string} getItemId - stable id per row
 * @param {(items: Array) => void} onReorder
 * @param {(item: unknown, index: number, dragHandle: React.ReactNode) => React.ReactNode} renderItem
 */
const SortableList = ({ items, getItemId, onReorder, renderItem }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const ids = items.map((item, index) => getItemId(item, index));

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(active.id);
    const newIndex = ids.indexOf(over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    onReorder(arrayMove(items, oldIndex, newIndex));
  };

  if (items.length === 0) return null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {items.map((item, index) => (
            <SortableRow key={ids[index]} id={ids[index]} serial={index + 1}>
              {({ dragHandle }) => renderItem(item, index, dragHandle)}
            </SortableRow>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortableList;
