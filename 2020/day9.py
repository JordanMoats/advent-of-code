with open('2020/input/9.txt') as file:
    content = file.read().strip()

nums = [int(x) for x in content.split('\n')]

def a():
    preamble_length = 25

    preamble = nums[:preamble_length]

    for x in range(preamble_length, len(nums)):
        next = nums[x]

        add_next = False
        # check if next is sum of 2 in current preamble
        for i in range(len(preamble) - 1):
            for j in range(i, len(preamble)):
                if preamble[i] + preamble[j] == next:
                    add_next = True
        
        if add_next:
            preamble.append(next)
            preamble.pop(0)
        else:
            return next

def b():
    target_sum = a()
    if target_sum == None:
        print('oops')
        return

    left = 0
    right = 1
    
    while True:
        current_sum = sum(nums[left:right])
        if current_sum > target_sum:
            left += 1
        elif current_sum < target_sum:
            right += 1
        else:
            window = nums[left:right]

            print('sum: ', min(window) + max(window))
            break
b()
