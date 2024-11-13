with open('2020/input/5.txt') as file:
    content = file.read()

def a():
    lines = content.split('\n')

    max_seat_id = 0
    
    for line in lines:
        row_string = line[:7]
        row = 0
        row_base = 64
        for c in row_string:
            if c == 'B':
                row += row_base
            row_base /= 2
        
        seat_string = line[7:]
        seat = 0
        seat_base = 4
        for c in seat_string:
            if c == 'R':
                seat += seat_base
            seat_base /= 2
        
        seat_id = (row * 8) + seat

        if seat_id > max_seat_id:
            max_seat_id = seat_id

    print(max_seat_id)
a()
