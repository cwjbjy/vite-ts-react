class DragBox {
  protected el: any;
  constructor() {
    this.el = null;
  }
  init(cls: string) {
    this.el = document.getElementsByClassName(cls)[0];
    return this;
  }
  DragStart() {
    this.el.onmousedown = (evt: React.DragEvent<HTMLDivElement>) => {
      const e = evt || window.event;
      const disX = e.pageX - this.el.offsetLeft;
      const disY = e.pageY - this.el.offsetTop;
      this.DragIng(disX, disY);
      this.DragEnd();
    };
  }
  DragIng(x: number, y: number) {
    document.onmousemove = (evt) => {
      const e = evt || window.event;
      this.el.style.left = e.pageX - x + 'px';
      this.el.style.top = e.pageY - y + 'px';
    };
  }
  DragEnd() {
    document.onmouseup = () => {
      document.onmouseup = document.onmousemove = null;
    };
  }
}

const Drag = new DragBox();

export default Drag;
